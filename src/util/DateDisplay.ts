export default class DateDisplay {
    public curr_date: Date;
    public curr_year: number;
    public curr_month: number;
  
    constructor() {
      this.curr_date = new Date();
      this.curr_year = this.curr_date.getFullYear();
      this.curr_month = this.curr_date.getMonth();
    }
  
    public get_weeks_data() {
      const week_values: { range: string, startDate: Date, endDate: Date }[] = [];
      let today = this.curr_date.getDay();
      if (!today) {
        today = 7;
      }
      for (let i = 0; i < 8; i++) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (today - 7 * i));
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const range = `${startDate.getMonth() + 1}/${startDate.getDate()} - ${
          endDate.getMonth() + 1
        }/${endDate.getDate()}`;
        week_values.push({ range, startDate, endDate });
      }
      for (let i = 8; i > 0; i--) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (today + 7 * i));
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const range = `${startDate.getMonth() + 1}/${startDate.getDate()} - ${
          endDate.getMonth() + 1
        }/${endDate.getDate()}`;
        week_values.push({ range, startDate, endDate });
      }
      return week_values;
    }

    public get_months_data() {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month_values: { range: string, startDate: Date, endDate: Date }[] = [];
       
      // Start from the current month and go backwards
      for (let i = 0; i < 12; i++) {
        const monthIndex = (this.curr_month - 1 - i + 12) % 12;
        const year = new Date().getFullYear() - Math.floor((this.curr_month - i) / 12);
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0); // last day of the month
        const range = months[monthIndex];
        month_values.push({ range, startDate, endDate });
      }
      return month_values.reverse();
    }
  
    public get_years_data() {
      const years: { range: string, startDate: Date, endDate: Date }[] = [];
      for (let i = 0; i < 10; i++) {
        const range = new Date().getFullYear() + i;
        const startDate = new Date(range, 0, 1); // January 1st of the year
        const endDate = new Date(range, 11, 31); // December 31st of the year
        years.push({ range: `${range}`, startDate, endDate });
      }

      for (let i = 10; i > 0; i--) {
        const range = new Date().getFullYear() - i;
        const startDate = new Date(range, 0, 1); // January 1st of the year
        const endDate = new Date(range, 11, 31); // December 31st of the year
        years.push({ range: `${range}`, startDate, endDate });
      }
      return years;
    }
  }