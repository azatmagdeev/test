
CREATE TABLE doctors (
  id int(11) PRIMARY KEY AUTO_INCREMENT,
  full_name varchar(100),
  spec varchar(100)
);

INSERT INTO doctors  VALUES
(1, 'Иванов И.А.', 'Терапевт'),
(2, 'Сергеев А.А.', 'Хирург'),
(3, 'Малинина Ю.И.', 'Массажист');


CREATE TABLE transactions (
  id int(10) PRIMARY KEY AUTO_INCREMENT,
  date DATE,
  doc_id int(10),
  summ int(10)
);

INSERT INTO transactions  VALUES
(1, '2019-06-01', 2, 2000),
(2, '2019-06-01', 3, 2000),
(3, '2019-06-03', 1, 1000),
(4, '2019-06-03', 2, 500),
(5, '2019-06-04', 1, 2000),
(6, '2019-06-07', 3, 2000),
(7, '2018-01-01', 2, 1000),
(8, '2017-03-02', 1, 1500);




-----v1-----

select d.full_name, d.spec,(
    select sum(t.summ)
    from transactions t
    where t.doc_id = d.id
    and year(t.date) = 2019
) as sum2019
from doctors d where (
    select sum(t.summ)
    from transactions t
    where t.doc_id = d.id
    and year(t.date) = 2019
) > 2500;

-----v2-----

create or REPLACE view sum2019 as
 select d.full_name, d.spec, sum(t.summ) as s_summ
 from transactions t, doctors d
 where t.doc_id = d.id
 and YEAR(t.date)= 2019
 GROUP BY d.id;

select * from sum2019 where s_summ > 2500;

-----v3-----

select * from (
    select d.full_name, d.spec, sum(t.summ) as s_sum
     from transactions t, doctors d
     where t.doc_id = d.id
     and YEAR(t.date)= 2019
     GROUP BY d.id
) as sum2019
where s_sum > 2500;

--
 create table roads
 (x int,
  y int,
  dt date);
 insert into roads (x, y, dt) values (2,4,'2019-01-01');
 insert into roads (x, y, dt) values (4,8,'2019-01-02');
 insert into roads (x, y, dt) values (1,6,'2019-01-03');
 insert into roads (x, y, dt) values (10,3,'2019-01-04');
 insert into roads (x, y, dt) values (2,11,'2019-01-05');
 insert into roads (x, y, dt) values (3,16,'2019-01-06');
 insert into roads (x, y, dt) values (7,20,'2019-01-07');
 insert into roads (x, y, dt) values (7,23,'2019-01-08');

SELECT sum(
  sqrt(
    pow(x - (SELECT x from roads r where r.dt*1 = roads.dt-1 ),2)
    + pow(y - (SELECT y from roads r where r.dt*1 = roads.dt-1 ),2)
  )
) result
FROM roads


SELECT sum(
  sqrt(
    pow(x - (SELECT x from roads r where r.dt*1 = roads.dt-1 ),2)
    + pow(y - (SELECT y from roads r where r.dt*1 = roads.dt-1 ),2)
  )
) result
FROM roads