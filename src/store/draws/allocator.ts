import { Allocation, Entry } from '../../types';

const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const allocator = (entry: Entry): Allocation => {
  const recur = (times: number): Allocation => {
    if (times < 1) {
      throw new Error('Unable to draw with these exclusions');
    }

    const recipient = shuffle(entry.participants);
    const allocation = Object.fromEntries(entry.participants.map((participant, idx) => [participant, recipient[idx]]));

    if (
      Object.entries(allocation).some(
        ([participant, recipient]) =>
          participant === recipient || (entry.exclusions[participant] ?? []).includes(recipient),
      )
    ) {
      return recur(times - 1);
    }

    return allocation;
  };

  return recur(100);
};
