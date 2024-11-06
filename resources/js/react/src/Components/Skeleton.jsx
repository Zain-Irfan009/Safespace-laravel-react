import { Typography } from "@material-tailwind/react";

export function Skeleton() {
  function cardSkelton() {
    return (
      <div className="bg-white p-2 relative">
        <div className="absolute top-6 right-2">
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
            className="mb-4 h-3 w-56 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="paragraph"
            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 10 }, () => cardSkelton())}
    </div>
  );
}
