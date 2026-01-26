const Grid = ({ 
  children, 
  cols = 3, 
  gap = 6,
  responsive = true,
  className = ''
}) => {
  const gridColsClass = `grid-cols-${cols}`;
  const gapClass = `gap-${gap}`;
  
  const responsiveClass = responsive 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
    : gridColsClass;

  return (
    <div className={`grid ${responsiveClass} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;
