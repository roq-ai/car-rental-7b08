import { PerformanceAssessmentInterface } from 'interfaces/performance-assessment';
import { ReservationInterface } from 'interfaces/reservation';
import { UsageInterface } from 'interfaces/usage';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  information: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  performance_assessment?: PerformanceAssessmentInterface[];
  reservation?: ReservationInterface[];
  usage?: UsageInterface[];
  organization?: OrganizationInterface;
  _count?: {
    performance_assessment?: number;
    reservation?: number;
    usage?: number;
  };
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
  information?: string;
  organization_id?: string;
}
