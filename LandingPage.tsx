@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', Arial, sans-serif;
    color: #14213d;
    background: linear-gradient(180deg, #f8fbff 0%, #f7fafc 100%);
    min-height: 100vh;
  }
}

@layer utilities {
  .gradient-hero {
    background: linear-gradient(180deg, #f8fbff 0%, #f7fafc 100%);
  }

  .gradient-cta {
    background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  }
}
