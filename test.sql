drop table if exists doctors;
create table doctors(
id integer primary key autoincrement,
full_name text,
spec text
);

insert into doctors values
(1, 'Иванов И.А.', 'Терапевт'),
(2, 'Сергеев А.А.', 'Хирург'),
(3, 'Малинина Ю.И.', 'Массажист');

drop table if exists transactions;
create table transactions(
id integer primary key autoincrement,
date integer,
doc_id integer,
summ real
);

insert into transactions values
(1, 2019, 2, 2000.0),
(2, 2019, 3, 2000.0),
(3, 2019, 1, 1000.0),
(4, 2019, 2, 500.0),
(5, 2019, 1, 2000.0),
(6, 2019, 3, 2000.0),
(7, 2018, 2, 1000.0),
(8, 2017, 1, 1500.0);

select d.full_name, d.spec, sum(t.summ) as sum_summ
from doctors d join transactions t on (d.id = t.doc_id)
where t.date = 2019
group by d.id
having sum_summ > 2500;