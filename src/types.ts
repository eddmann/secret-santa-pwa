export type Participant = string;

export type Entry = {
  type: 'remote' | 'local';
  title: string;
  participants: Participant[];
  exclusions: Record<Participant, Participant[] | undefined>;
};

export type DrawId = string;

export type UnixTimestamp = number;

export type Allocation = Record<Participant, Participant>;

export type Draw = {
  id: DrawId;
  entry: Entry;
  allocation: Allocation;
  at: UnixTimestamp;
};

export type RemoteReveal = {
  title: string;
  participant: string;
  recipient: string;
};

export type WrappedRemoteReveal = string;
