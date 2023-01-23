import { Skeleton, Stack } from '@mui/material';

const MySkeleton = ({ times, className }) => {
  const boxes = Array(times)
    .fill(0)
    .map((_, index) => <Skeleton key={index} animation="wave" />);
  return <Stack spacing={1}>{boxes}</Stack>;
};

export default MySkeleton;

/*
<div key={index} className={outerClassNames}>
    <div className={innerClassNames} />
</div>
*/

// import classNames from 'classnames';
// const outerClassNames = classNames(
//   'relative',
//   'overflow-hidden',
//   'bg-gray-200',
//   'rounded',
//   'mb-2.5',
//   className
// );
// const innerClassNames = classNames(
//   'animate-shimmer',
//   'absolute',
//   'inset-0',
//   '-translate-x-full',
//   'bg-gradient-to-r',
//   'from-gray-200',
//   'via-white',
//   'to-gray-200'
// );
