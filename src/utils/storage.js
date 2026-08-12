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
  return uid ? `isl_buddy_user_progress_${uid}` : 'isl_buddy_active_session';
};

export const getStoredProgressForUser = (user) => {
  if (!user || !user.uid) return null;
  const key = getUserStorageKey(user.uid);
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      const newState = {
        ...DEFAULT_NEW_USER_STATE,
        user,
        username: user.displayName || user.email?.split('@')[0] || 'Learner'
      };
      saveProgressForUser(user.uid, newState);
      return newState;
    }
    const parsed = JSON.parse(data);
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastStreakDate;
    
    if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) {
        parsed.todayXpEarned = 0;
      } else {
        parsed.streakDays = 1;
        parsed.todayXpEarned = 0;
      }
      parsed.lastStreakDate = today;
    }
    
    const finalState = { ...DEFAULT_NEW_USER_STATE, ...parsed, user };
    saveProgressForUser(user.uid, finalState);
    return finalState;
  } catch (err) {
    return { ...DEFAULT_NEW_USER_STATE, user };
  }
};

export const getStoredProgress = () => {
  const currentUid = localStorage.getItem('isl_buddy_current_user_id');
  if (currentUid) {
    const rawUser = localStorage.getItem(`isl_buddy_user_progress_${currentUid}`);
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
    localStorage.setItem('isl_buddy_current_user_id', uid);
    updateGlobalLeaderboard(progress);
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
    const raw = localStorage.getItem('isl_buddy_all_learners');
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
    localStorage.setItem('isl_buddy_all_learners', JSON.stringify(currentList));
  } catch (e) {}
};
