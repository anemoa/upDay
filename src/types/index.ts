// Challenge 타입
export interface Challenge {
  id: number;
  author_id: number;
  title: string;
  content: string;
  category: string;
  duration: string;
  post_date: string;
  post_clicked: number;
  created_at: string;
  updated_at: string;
  users?: User;
  participants?: Participant[];
}

// User 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  user_img?: string;
  created_at: string;
  updated_at?: string;
  password: string;
  user_profiles?: UserProfile;
}

// UserProfile 타입
export interface UserProfile {
  id: number;
  user_id: number;
  about?: string;
  profile_image?: string;
}

// Participant 타입
export interface Participant {
  id: number;
  challenge_id: number;
  author_id: number;
  join_date?: string;
  status: 'doing' | 'done' | 'not_started';
  created_at: string;
  updated_at?: string;
}

// Redux State 타입
export interface ChallengeState {
  list: Challenge[];
  loading: boolean;
  error: string | null;
  selectedChallenge: Challenge | null;
}

export interface UserChallengeState {
  myPosts: Challenge[];
  joinedChallenges: Challenge[];
  selectedChallenge: Challenge | null;
  numericUserId: number | null;
  loading: {
    myPosts: boolean;
    joinedChallenges: boolean;
	status?: boolean;
  };
  error: string | null;
}