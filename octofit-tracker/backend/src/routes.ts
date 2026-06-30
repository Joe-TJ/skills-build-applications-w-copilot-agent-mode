import { Router } from 'express';

import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

export const createApiRouter = (apiBaseUrl: string): Router => {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({
      service: 'octofit-api',
      baseUrl: apiBaseUrl,
      routes: {
        users: `${apiBaseUrl}/api/users/`,
        teams: `${apiBaseUrl}/api/teams/`,
        activities: `${apiBaseUrl}/api/activities/`,
        leaderboard: `${apiBaseUrl}/api/leaderboard/`,
        workouts: `${apiBaseUrl}/api/workouts/`,
      },
    });
  });

  router.get('/users/', async (_req, res, next) => {
    try {
      const users = await User.find().lean();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  router.get('/teams/', async (_req, res, next) => {
    try {
      const teams = await Team.find().lean();
      res.json(teams);
    } catch (error) {
      next(error);
    }
  });

  router.get('/activities/', async (_req, res, next) => {
    try {
      const activities = await Activity.find().sort({ recordedAt: -1 }).lean();
      res.json(activities);
    } catch (error) {
      next(error);
    }
  });

  router.get('/leaderboard/', async (_req, res, next) => {
    try {
      const leaderboard = await LeaderboardEntry.find().sort({ rank: 1, score: -1 }).lean();
      res.json(leaderboard);
    } catch (error) {
      next(error);
    }
  });

  router.get('/workouts/', async (_req, res, next) => {
    try {
      const workouts = await Workout.find().lean();
      res.json(workouts);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
