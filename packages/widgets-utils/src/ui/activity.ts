export type ActivityTypeOption = { key: string; title: string };
export const ACTIVITY_TYPE_OPTIONS: ActivityTypeOption[] = [
  {
    key: 'stars',
    title: 'Stars',
  },
  {
    key: 'pull-requests',
    title: 'Pull Requests',
  },
  {
    key: 'pull-request-creators',
    title: 'Pull Requests Creators',
  },
  {
    key: 'issues',
    title: 'Issues',
  },
  {
    key: 'issue-creators',
    title: 'Issue Creators',
  },
  {
    key: 'issue-closed-ratio',
    title: 'Issue Closed Ratio',
  },
  {
    key: 'pr-merged-ratio',
    title: 'PR Merged Ratio',
  },
  {
    key: 'pr-reviewed-ratio',
    title: 'PR Reviewed Ratio',
  },
];

export function activityDisplayName (key: string) {
  return ACTIVITY_TYPE_OPTIONS.find(a => a.key === key)?.title ?? 'Unknown';
}
