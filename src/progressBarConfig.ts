const COLOR_CLASS = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "danger",
    "black",
  ] as const;
  
  const COLOR_INFO: Record<
    (typeof COLOR_CLASS)[number],
    {
      begin: [number, number, number];
      end: [number, number, number];
    }
  > = {
    primary: {
      begin: [144, 202, 249],
      end: [66, 165, 245],
    },
    secondary: {
      begin: [227, 126, 255],
      end: [214, 67, 255],
    },
    info: {
      begin: [144, 202, 249],
      end: [47, 162, 255],
    },
    success: {
      begin: [47, 198, 128],
      end: [0, 171, 139],
    },
    warning: {
      begin: [255, 193, 7],
      end: [255, 162, 0],
    },
    danger: {
      begin: [255, 149, 160],
      end: [255, 72, 91],
    },
    black: {
      begin: [67, 67, 67],
      end: [0, 0, 0],
    },
  };
  
  export { COLOR_CLASS, COLOR_INFO };
  