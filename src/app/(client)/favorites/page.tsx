import FavoritesJobs from "@/components/jobs/FavoriteJobs";
import Jobss from "@/server/models/job";

// Assuming we have access to the jobs data

export default async function FavoritesPage() {
  const jobs = await Jobss.find().sort({ createdAt: -1 });

  return (
    <div className="">
      <FavoritesJobs jobs={JSON.stringify(jobs)} />
    </div>
  );
}
