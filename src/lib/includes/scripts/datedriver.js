class DateDriver {
  constructor({ maxDaysRed: maxDaysRed = 30 } = {}) {
    (this.input = []), (this.deadlines = []), (this.maxDaysRed = maxDaysRed);
  }
  addDeadline(deadline) {
    return Array.isArray(deadline)
      ? Object.assign(this.input, deadline)
      : (this.input.push(deadline), this.input);
  }
  clearDeadlines() {
    this.input = [];
  }
  calculateDeadlines() {
    this.input.length || console.warn('No deadline input provided yet.');
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var currentYear = currentDate.getFullYear();
    return (
      this.input.forEach((i) => {
        var pastDeadline =
            currentDate.valueOf() >
            this.createDate(i.date, currentYear).valueOf(),
          name = i.name,
          date = this.createDate(i.date, currentYear + +pastDeadline),
          year = currentYear + i.addYears + +pastDeadline,
          days = this.numDaysBetween(date, currentDate);
        this.deadlines.push({
          date: date,
          name: name,
          year: year,
          red: days <= this.maxDaysRed
        });
      }),
      this.deadlines
    );
  }
  displayDeadlines(
    id,
    {
      asc: asc = !0,
      dateHeader: dateHeader = 'Dates',
      deadlineHeader: deadlineHeader = 'Deadlines',
      showYear: showYear = true
    }
  ) {
    this.deadlinesExist() || this.calculateDeadlines(), this.sortDeadlines(asc);
    var element = $(`#${id}`);
    element.html(''),
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
              $(`<tr ${deadline.red && "style='color:red;'"}></tr>`).append(
                $('<td></td>').text(
                  `${deadline.name} ${showYear ? `(${deadline.year})` : ''}`
                ),
                $('<td></td>').text(this.formatDate(deadline.date))
              )
            )
          )
        )
      );
  }
  numDaysBetween(d1, d2) {
    return (d1.valueOf() - d2.valueOf()) / 864e5;
  }
  createDate(yearMonth, year) {
    return new Date(`${yearMonth}/${year}`);
  }
  sortDeadlines(asc = !0) {
    return (
      this.deadlinesExist() || this.calculateDeadlines(),
      this.deadlines.sort(
        (a, b) =>
          (asc
            ? a.date.valueOf() - b.date.valueOf()
            : b.date.valueOf() - a.date.valueOf()) ||
          (asc ? b.year - a.year : a.year - b.year) ||
          (asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
      )
    );
  }
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
  deadlinesExist() {
    return !!this.deadlines.length;
  }
}

window.DateDriver = DateDriver;
