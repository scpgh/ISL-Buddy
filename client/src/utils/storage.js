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
  appLanguage: 'english'
};

export const getUserStorageKey = (uid) => {
  return uid ? `smartsign_user_progress_${uid}` : 'smartsign_active_session';
};

export const getStoredProgressForUser = (user) => {
  if (!user || !user.uid) return null;
  const uid = user.uid;
  const key = getUserStorageKey(uid);

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
    
    if (lastDate && lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) {
        stateToUse.todayXpEarned = 0;
      } else {
        stateToUse.streakDays = Math.max(1, stateToUse.streakDays || 1);
        stateToUse.todayXpEarned = 0;
      }
      stateToUse.lastStreakDate = today;
    }
    
    const finalState = { 
      ...DEFAULT_NEW_USER_STATE, 
      ...stateToUse, 
      user,
      completedPhrases: stateToUse.completedPhrases || [],
      completedUnits: stateToUse.completedUnits || []
    };

    localStorage.setItem(key, JSON.stringify(finalState));
    localStorage.setItem('smartsign_current_user_id', uid);
    
    syncCloudProgress(uid, finalState);
    updateGlobalLeaderboard(finalState);

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
  if (!uid || !progress) return;
  const key = getUserStorageKey(uid);
  try {
    const cleanProgress = {
      ...progress,
      user: progress.user ? { uid: progress.user.uid, email: progress.user.email, displayName: progress.user.displayName } : null
    };
    localStorage.setItem(key, JSON.stringify(cleanProgress));
    localStorage.setItem('smartsign_current_user_id', uid);
    
    updateGlobalLeaderboard(cleanProgress);
    syncCloudProgress(uid, cleanProgress);
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

  currentList.sort((a, b) => (b.xp || 0) - (a.xp || 0));

  try {
    localStorage.setItem('smartsign_all_learners', JSON.stringify(currentList));
    
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, name, xp, isUser: true, avatar: "🤟", location: "India" })
      }).catch(() => {});
    }
  } catch (e) {}
};

async function syncCloudProgress(uid, progress) {
  try {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      await fetch(`/api/progress/${uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progress)
      });
    }
  } catch (err) {}
}

async function fetchCloudProgress(uid) {
  try {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      const res = await fetch(`/api/progress/${uid}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.progress) {
          const key = getUserStorageKey(uid);
          localStorage.setItem(key, JSON.stringify(data.progress));
        }
      }
    }
  } catch (err) {}
}
