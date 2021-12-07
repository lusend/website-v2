interface DateDriverOptions {
  maxDaysRed: number;
}

class DateDriver {
  protected maxDaysRed: number;

  protected input: {
    date: string;
    name: string;
    addYears: number;
  }[] = [];

  public deadlines: {
    date: Date;
    name: string;
    year: number;
    red: boolean;
  }[] = [];

  constructor({ maxDaysRed = 30 } = {}) {
    this.maxDaysRed = maxDaysRed;
  }

  public addDeadline(deadline: typeof this.input[0] | typeof this.input) {
    if (Array.isArray(deadline)) return Object.assign(this.input, deadline);

    this.input.push(deadline);
    return this.input;
  }

  public clearDeadlines() {
    this.input = [];
  }

  public calculateDeadlines() {
    if (!this.input.length) console.warn('No deadline input provided yet.');

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const currentYear = currentDate.getFullYear();

    this.input.forEach((i) => {
      const pastDeadline =
        currentDate.valueOf() > this.createDate(i.date, currentYear).valueOf();

      const name = i.name;
      const date = this.createDate(i.date, currentYear + +pastDeadline);
      const year = currentYear + i.addYears + +pastDeadline;

      const days = this.numDaysBetween(date, currentDate);

      this.deadlines.push({
        date,
        name,
        year,
        red: days <= this.maxDaysRed
      });
    });

    return this.deadlines;
  }

  public displayDeadlines(
    id: string,
    { asc = true, dateHeader = 'Dates', deadlineHeader = 'Deadlines' }
  ) {
    if (!this.deadlinesExist()) this.calculateDeadlines();
    this.sortDeadlines(asc);

    const element = $(`#${id}`);

    element.html('');
    element.append(
      $('<table></table>').append(
        $('<thead></thead>').append(
          $('<tr></tr>').append(
            $('<th></th>').text(dateHeader),
            $('<th></th>').text(deadlineHeader)
          )
        ),
        $('<tbody></tbody>').append(
          this.deadlines.map((deadline) =>
            $(`<tr ${deadline.red && `style='color:red;'`}></tr>`).append(
              $('<td></td>').text(`${deadline.name} (${deadline.year})`),
              $('<td></td>').text(this.formatDate(deadline.date))
            )
          )
        )
      )
    );
  }

  protected numDaysBetween(d1: Date, d2: Date) {
    return (d1.valueOf() - d2.valueOf()) / (1000 * 60 * 60 * 24);
  }

  protected createDate(yearMonth: string, year: number) {
    return new Date(`${yearMonth}/${year}`);
  }

  public sortDeadlines(asc = true) {
    if (!this.deadlinesExist()) this.calculateDeadlines();

    return this.deadlines.sort(
      (a, b) =>
        (asc
          ? a.date.valueOf() - b.date.valueOf()
          : b.date.valueOf() - a.date.valueOf()) ||
        (asc ? b.year - a.year : a.year - b.year) ||
        (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
    );
  }

  public formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  protected deadlinesExist() {
    return !!this.deadlines.length;
  }
}

(window as any).DateDriver = DateDriver;

(function () {
  const datedriver = new DateDriver();
  datedriver.addDeadline([
    {
      date: '12/07',
      name: 'Hello1',
      addYears: 1
    },
    {
      date: '12/06',
      name: 'Hello3',
      addYears: 1
    },
    {
      date: '12/07',
      name: 'Hello4',
      addYears: 2
    },
    {
      date: '12/07',
      name: 'Hello2',
      addYears: 1
    }
  ]);

  datedriver.displayDeadlines('dates', {
    dateHeader: 'Trip Dates',
    deadlineHeader: 'Proposal Deadlines'
  });
})();
