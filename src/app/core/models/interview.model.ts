
export interface Interview {
  id?: string;
  startTime: string;
  endTime: string;
  job: string;
  candidate: {
    email: string,
    assists: boolean
  };
  staffId?: string;
  interviewer: {
    email: string,
    assists: boolean
  };
  comments?: string[];
  status: string; //  FINISHED, UNFINISHED, IN PROGESS
}
