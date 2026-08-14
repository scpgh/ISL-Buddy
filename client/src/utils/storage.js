const DEFAULT_NEW_USER_STATE = {
  xp: 0,
  hearts: 5,
  maxHearts: 5,
  streakDays: 1,
  lastStreakDate: new Date().toISOString().split('T')[0],
  completedPhrases: [],
  completedUnits: [],
  soundEnabled: true,
  vibrationEnabled: true,
  dailyGoalXp: 30,
  todayXpEarned: 0,
  level: 1,
  title: "Beginner Signer",
  user: null,
  username: 'Learner',
  appLanguage: 'english' // 'english' or 'hindi'
};

export const getUserStorageKey = (uid) => {
  return uid ? `smartsign_user_progress_${uid}` : 'smartsign_active_session';
};

export const getStoredProgressForUser = (user) => {
  if (!user || !user.uid) return null;
  const key = getUserStorageKey(user.uid);
  try {
    const data = localStorage.getItem(key);
    let stateToUse = null;

    if (data) {
      stateToUse = JSON.parse(data);
    } else {
      stateToUse = {
        ...DEFAULT_NEW_USER_STATE,
        user,
        username: user.displayName || user.email?.split('@')[0] || 'Learner'
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const lastDate = stateToUse.lastStreakDate;
    
    if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) {
        stateToUse.todayXpEarned = 0;
      } else {
        stateToUse.streakDays = 1;
        stateToUse.todayXpEarned = 0;
      }
      stateToUse.lastStreakDate = today;
    }
    
    const finalState = { ...DEFAULT_NEW_USER_STATE, ...stateToUse, user };
    
    // Asynchronously fetch latest progress from central cloud server
    fetchCloudProgress(user.uid);
    
    saveProgressForUser(user.uid, finalState);
    return finalState;
  } catch (err) {
    return { ...DEFAULT_NEW_USER_STATE, user };
  }
};

export const getStoredProgress = () => {
  const currentUid = localStorage.getItem('smartsign_current_user_id');
  if (currentUid) {
    const rawUser = localStorage.getItem(`smartsign_user_progress_${currentUid}`);
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        if (parsed.user) {
          return getStoredProgressForUser(parsed.user);
        }
      } catch (e) {}
    }
  }
  return null;
};

export const saveProgressForUser = (uid, progress) => {
  if (!uid) return;
  const key = getUserStorageKey(uid);
  try {
    localStorage.setItem(key, JSON.stringify(progress));
    localStorage.setItem('smartsign_current_user_id', uid);
    updateGlobalLeaderboard(progress);

    // Sync progress to cloud server in background
    syncCloudProgress(uid, progress);
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
};

export const saveProgress = (progress) => {
  if (progress && progress.user && progress.user.uid) {
    saveProgressForUser(progress.user.uid, progress);
  }
};

export const setAppLanguage = (lang) => {
  const current = getStoredProgress();
  if (current && current.user) {
    const updated = { ...current, appLanguage: lang };
    saveProgressForUser(current.user.uid, updated);
    return updated;
  }
  return null;
};

// Registered Real Learners Directory (ONLY Real Logged-in Users)
export const getGlobalLeaderboard = () => {
  try {
    const raw = localStorage.getItem('smartsign_all_learners');
    if (!raw) return [];
    const learners = JSON.parse(raw);
    return Array.isArray(learners) ? learners : [];
  } catch (e) {
    return [];
  }
};

export const updateGlobalLeaderboard = (progress) => {
  if (!progress || !progress.user || !progress.user.uid) return;
  const uid = progress.user.uid;
  const name = progress.username || progress.user.displayName || progress.user.email?.split('@')[0] || 'Learner';
  const xp = progress.xp || 0;

  let currentList = getGlobalLeaderboard();

  const existingIdx = currentList.findIndex((u) => u.uid === uid);
  if (existingIdx !== -1) {
    currentList[existingIdx] = {
      ...currentList[existingIdx],
      uid,
      name,
      xp,
      isUser: true,
      avatar: "🤟"
    };
  } else {
    currentList.push({
      uid,
      name,
      location: "India",
      xp,
      avatar: "🤟",
      isUser: true
    });
  }

  // Sort descending by real earned XP
  currentList.sort((a, b) => b.xp - a.xp);

  try {
    localStorage.setItem('smartsign_all_learners', JSON.stringify(currentList));
    
    // Sync leaderboard item to cloud server in background
    fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, name, xp, isUser: true, avatar: "🤟", location: "India" })
    }).catch(() => {});
  } catch (e) {}
};

// Asynchronous Cloud Storage Sync Helpers
async function syncCloudProgress(uid, progress) {
  try {
    await fetch(`/api/progress/${uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progress)
    });
  } catch (err) {
    // Silently handle offline fallback
  }
}

async function fetchCloudProgress(uid) {
  try {
    const res = await fetch(`/api/progress/${uid}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.progress) {
        const key = getUserStorageKey(uid);
        localStorage.setItem(key, JSON.stringify(data.progress));
      }
    }
  } catch (err) {
    // Silently handle offline fallback
  }
}
