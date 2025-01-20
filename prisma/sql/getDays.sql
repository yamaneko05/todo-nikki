-- @param {DateTime} $1:date
SELECT *, days.date as "dayDate" FROM (
  SELECT * FROM generate_series(
    $1::date + interval '1 day',
    $1::date + interval '12 day',
    '1 day'
  ) date
) AS days
LEFT JOIN "Task" tasks ON tasks."date"::date = days.date::date
