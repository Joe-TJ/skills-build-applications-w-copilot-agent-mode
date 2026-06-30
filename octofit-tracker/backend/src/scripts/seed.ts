import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const users = [
  {
    username: 'mona-runner',
    email: 'mona.runner@example.com',
    displayName: 'Mona Chen',
  },
  {
    username: 'devon-lifts',
    email: 'devon.lifts@example.com',
    displayName: 'Devon Patel',
  },
  {
    username: 'sam-cycles',
    email: 'sam.cycles@example.com',
    displayName: 'Sam Rivera',
  },
  {
    username: 'taylor-yoga',
    email: 'taylor.yoga@example.com',
    displayName: 'Taylor Morgan',
  },
];

const teams = [
  {
    name: 'Cardio Crew',
    members: ['mona-runner', 'sam-cycles'],
  },
  {
    name: 'Strength Squad',
    members: ['devon-lifts', 'taylor-yoga'],
  },
];

const activities = [
  {
    userId: 'mona-runner',
    type: 'Outdoor run',
    durationMinutes: 42,
    recordedAt: new Date('2026-06-26T13:30:00Z'),
  },
  {
    userId: 'devon-lifts',
    type: 'Strength training',
    durationMinutes: 55,
    recordedAt: new Date('2026-06-27T22:15:00Z'),
  },
  {
    userId: 'sam-cycles',
    type: 'Interval cycling',
    durationMinutes: 48,
    recordedAt: new Date('2026-06-28T11:00:00Z'),
  },
  {
    userId: 'taylor-yoga',
    type: 'Recovery yoga',
    durationMinutes: 35,
    recordedAt: new Date('2026-06-29T19:45:00Z'),
  },
];

const leaderboard = [
  {
    userId: 'devon-lifts',
    score: 980,
    rank: 1,
  },
  {
    userId: 'mona-runner',
    score: 915,
    rank: 2,
  },
  {
    userId: 'sam-cycles',
    score: 870,
    rank: 3,
  },
  {
    userId: 'taylor-yoga',
    score: 810,
    rank: 4,
  },
];

const workouts = [
  {
    title: '5K Pace Builder',
    description: 'Tempo intervals and cooldown work for runners improving speed.',
    difficulty: 'intermediate',
  },
  {
    title: 'Full Body Strength Circuit',
    description: 'Compound lifts and accessory movements for balanced strength.',
    difficulty: 'advanced',
  },
  {
    title: 'Low Impact Ride',
    description: 'Steady cycling session for endurance without heavy joint load.',
    difficulty: 'beginner',
  },
  {
    title: 'Mobility Reset',
    description: 'Guided flexibility flow focused on hips, hamstrings, and shoulders.',
    difficulty: 'beginner',
  },
];

const seed = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
    User.insertMany(users),
    Team.insertMany(teams),
    Activity.insertMany(activities),
    LeaderboardEntry.insertMany(leaderboard),
    Workout.insertMany(workouts),
  ]);

  console.log(
    `Seed complete: ${createdUsers.length} users, ${createdTeams.length} teams, ${createdActivities.length} activities, ${createdLeaderboard.length} leaderboard entries, ${createdWorkouts.length} workouts.`,
  );
};

seed()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
