import { Schema, model, models } from 'mongoose';

type UserDocument = {
  username: string;
  email?: string;
  displayName?: string;
};

type TeamDocument = {
  name: string;
  members: string[];
};

type ActivityDocument = {
  userId: string;
  type: string;
  durationMinutes: number;
  recordedAt: Date;
};

type LeaderboardEntryDocument = {
  userId: string;
  score: number;
  rank?: number;
};

type WorkoutDocument = {
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, trim: true },
    displayName: { type: String, trim: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    members: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    userId: { type: String, required: true, trim: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { timestamps: true },
);

export const User = models.User || model<UserDocument>('User', userSchema);
export const Team = models.Team || model<TeamDocument>('Team', teamSchema);
export const Activity = models.Activity || model<ActivityDocument>('Activity', activitySchema);
export const LeaderboardEntry =
  models.LeaderboardEntry || model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = models.Workout || model<WorkoutDocument>('Workout', workoutSchema);
