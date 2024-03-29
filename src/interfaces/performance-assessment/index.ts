import { VehicleInterface } from 'interfaces/vehicle';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceAssessmentInterface {
  id?: string;
  vehicle_id?: string;
  assessment: string;
  created_at?: any;
  updated_at?: any;

  vehicle?: VehicleInterface;
  _count?: {};
}

export interface PerformanceAssessmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  vehicle_id?: string;
  assessment?: string;
}
