export const data = {
  labels: ["Your Contribution", "Total Asset Amount"],
  datasets: [
    {
      backgroundColor: ["#FDE047", "#38BDF8"],
      data: [25, 75],
    },
  ],
};

export const options = {
  responsive: true,
  maintaineAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};
