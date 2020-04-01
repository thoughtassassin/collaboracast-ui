import { useState, useEffect, useCallback } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(false);

  const loadingCleanup = useCallback(() => setLoading(false), [setLoading]);

  useEffect(() => () => loadingCleanup(), [loadingCleanup]);

  return [loading, setLoading];
};

export default useLoader;
