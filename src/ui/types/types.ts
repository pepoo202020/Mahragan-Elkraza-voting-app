import {
  Artwork,
  ArtworkType,
  User,
  Vote,
} from "../../../lib/generated/prisma";

export interface IAllYears {
  value: string;
  label: { en: string; ar: string };
}

export interface UiVoteEvent {
  id: string;
  title: string;
  description: string;
  year: string;
  numberOfVotes: number;
  currentEvent: boolean;
  active: boolean;
  startTime: Date;
  endTime: Date;
}

export type VoteCategory = "INDIVIDUAL" | "GROUP";

export interface UiVoteRow {
  id: string;
  createdAt: Date;
  userName: string;
  userEmail: string;
  artworkTitle: string;
  artworkId: string;
  votingEventId: string;
  category: VoteCategory;
}

export type Role = "ADMIN" | "USER" | "CUSTOMER";
export type TArtworkType = "INDIVIDUAL" | "GROUP";

export type TCategoryFilter = ArtworkType | "all";

export interface IArtworksWithVotes extends Artwork {
  votes: Vote[];
}

export interface ITableHeadRow {
  title: string;
  className?: string;
}

export interface IArtworkWithDetails extends Artwork {
  votes: Vote[];
  lovedBy: User[];
}

export interface IUsersWithVotesAndComments extends User {
  votes: Vote[];
  comments: Comment[];
}
