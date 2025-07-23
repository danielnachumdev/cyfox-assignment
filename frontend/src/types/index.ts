export interface Project {
  id: number;
  name: string;
  createdAt: string;
  bugCount?: number;
}

export type BugSeverity = 'low' | 'medium' | 'high' | 'critical';
export type BugStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Bug {
  id: number;
  projectId: number;
  title: string;
  description: string;
  severity: BugSeverity;
  status: BugStatus;
  createdAt: string;
}

export interface CreateProjectRequest {
  name: string;
}

export interface CreateBugRequest {
  title: string;
  description: string;
  severity: BugSeverity;
  status: BugStatus;
}

export interface UpdateBugRequest {
  title?: string;
  description?: string;
  severity?: BugSeverity;
  status?: BugStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: boolean;
  error: {
    message: string;
    code: string;
    details?: any;
  };
}

export interface BugStatistics {
  totalBugs: number;
  byStatus: {
    open: number;
    in_progress: number;
    resolved: number;
    closed: number;
  };
  bySeverity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}