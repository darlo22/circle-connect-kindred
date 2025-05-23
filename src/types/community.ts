
export interface CommunityStats {
  activeConnections: number;
  monthlyMeetups: number;
  discussionTopics: number;
  averageFeedbackRating?: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  logoImage?: string;
  memberCount: number;
  subscriptionType: 'Community' | 'Individual';
  guidelines?: string;
  foundedDate?: string;
  stats?: CommunityStats;
  isPrivate: boolean;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  occupation: string;
  city: string;
  intent: 'Friendship' | 'Business' | 'Romance' | 'Mentorship';
  joinDate: string;
  isActive: boolean;
  isNew: boolean;
}
