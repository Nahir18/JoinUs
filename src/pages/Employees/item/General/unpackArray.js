import React, {useMemo} from "react";

export default (OriginalComponent) => ({value, ...props}) => {
  const getDate = useMemo(() => {
    if (value && value.length > 0) {
      return value[0]
    }
  }, [value])
  return (
    <OriginalComponent
      {...props}
      value={getDate}
    />
  )
}
