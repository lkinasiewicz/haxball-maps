type RoomInit = {
  roomName: string;
  playerName: string;
  maxPlayers: number;
  public: boolean;
  noPlayer: boolean;
  password?: string;
  geo?: { code: string; lat: number; lon: number };
  token?: string;
};

type Room = any;

declare function HBInit(config: RoomInit): Room;
