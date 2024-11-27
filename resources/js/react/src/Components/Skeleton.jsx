import { Typography } from "@material-tailwind/react";

export function Skeleton() {
  function cardSkelton() {
    return (
      <div className="bg-white rounded-lg p-2 relative">
        <div className="absolute lg:top-6 md:top-6 top-4 right-2  sm:block">
          <Typography
            as="div"
            variant="button"
            className="h-6 w-20 rounded bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>

        <div className="max-w-full animate-pulse mt-4">
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-3 w-3/4 sm:w-2/3 md:w-1/2 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-full sm:w-4/5 md:w-3/4 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-full sm:w-4/5 md:w-3/4 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-full sm:w-4/5 md:w-3/4 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-full sm:w-4/5 md:w-3/4 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4">
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index}>{cardSkelton()}</div>
      ))}
    </div>
  );
}
