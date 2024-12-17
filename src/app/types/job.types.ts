const jobTypes = ["On-site", "Hybrid", "Remote"] as const;
type JobType = (typeof jobTypes)[number];

type TCompanyLogo = {
  publicId: string;
  secureUrl: string;
};

export interface TJob {
  _id: number;
  title: string;
  company: string;
  companyLogo: TCompanyLogo;
  location: string;
  type: JobType;
  applicationDeadline: string;
  description: string;
  jobType: string;
  category: string;
  vacancies: string;
  postedDate: string;
  createdAt: string;
}
