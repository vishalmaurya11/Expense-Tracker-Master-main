drop table Member;
create table Member(
    Mem_id bigserial,
    Fname varchar(20),
    Lname varchar(20),
    DOB timestamp,
    Salary numeric(15,2),
    Phone_Num char(10),
    Email varchar(30),
    Password varchar(20),
    primary key (Mem_id)
);
    INSERT INTO Member(Fname, Lname, DOB, Salary, Phone_Num, Email, Password) VALUES('Hussain', 'Diwan', '2001-11-11',2200000,'1234567890', 'hd@gmail.com','123456');
Select * from member;


drop table Groups;
create table Groups(
    Group_id bigserial,
    Owner_id bigserial,
    Name varchar(20),
    Created_on timestamp,
    primary key (Group_id),
    foreign key (Owner_id) references Member
);
INSERT INTO Groups(Owner_id,Name,Created_on) VALUES (1,'Project Group','2022-10-24');
INSERT INTO Groups(Owner_id,Name,Created_on) VALUES (2,'Dinner Group','2022-10-24');
INSERT INTO Groups(Owner_id,Name,Created_on) VALUES (3,'Rent Group','2022-10-24');
Select * from Groups;

create table Belongs_To(
    Mem_id bigserial,
    Group_id bigserial,
    amount_due numeric(15,2),
    primary key(Mem_id,Group_id),
    foreign key (Mem_id) references Member,
    foreign key (Group_id) references Groups
);
insert into belongs_to values(1,1,0);
insert into belongs_to values(2,1,0);
insert into belongs_to values(4,1,0);
insert into belongs_to values(5,1,0);
insert into belongs_to values(3,2,0);
insert into belongs_to values(2,2,0);
insert into belongs_to values(5,2,0);
insert into belongs_to values(1,2,0);
insert into belongs_to values(1,3,0);
insert into belongs_to values(2,3,0);
insert into belongs_to values(3,3,0);
insert into belongs_to values(4,3,0);
insert into belongs_to values(5,3,0);

update belongs_to SET amount_due = amount_due+100 WHERE Group_id=1 AND Mem_id=1;

SELECT Mem_id, amount_due from belongs_to WHERE Group_id=1;
create table Group_Expense(
    Expense_id bigserial,
    Group_id bigserial,
    Paid_by_mem_id bigserial,
    Added_by_mem_id bigserial,
    Amount numeric(15,2),
    Remarks varchar(30),
    Date timestamp,
    primary key (Expense_id),
    foreign key (Group_id) references Groups,
    foreign key (Paid_by_mem_id) references member,
    foreign key (Added_by_mem_id) references member,
);

INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(1,1,1,1000,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(1,2,1,500,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(2,3,1,1000,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(2,1,1,100,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(3,1,1,1000,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(3,3,1,100,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(3,3,1,200,'TP','2022-10-24');
INSERT INTO Group_Expense(Group_id, Paid_by_mem_id,Added_by_mem_id,Amount,Remarks,Date) VALUES(3,2,1,100,'TP','2022-10-24');

SELECT SUM(Amount) from Group_Expense WHERE Group_id=1;
SELECT Mem_id, SUM(Share_Amount), Group_id from shares group by(Group_id);
create table shares(
    Expense_id bigserial,
    Group_id bigserial,
    Mem_id bigserial,
    Share_amount numeric(15,2),
    Settled boolean,
    primary key (Expense_id,Group_id,Mem_id),
    foreign key (Expense_id) references Group_Expense,
    foreign key (Group_id) references Groups,
    foreign key (Mem_id) references member
);


-- for charts user apne expense types khud bata sakta hai aur jab naya expense banaega to dropdown mein types select karega
create table expense_type(
    Expense_type_id bigserial,
    Mem_id bigserial,
    Type varchar(20) default 'default',
    primary key(Expense_type_id) ,
    foreign key (Mem_id) references member
);
INSERT INTO expense_type(Type) VALUES ('Other..');
INSERT INTO expense_type(Type) VALUES ('Food');
INSERT INTO expense_type(Type) VALUES ('Travel');
INSERT INTO expense_type(Type) VALUES ('Rent');
INSERT INTO expense_type(Type) VALUES ('Health Care');
INSERT INTO expense_type(Type) VALUES ('Entertainment');
INSERT INTO expense_type(Type) VALUES ('Groceries');
INSERT INTO expense_type(Type) VALUES ('Utilities');

create table Individual_Expense(
    Expense_id bigserial,
    Mem_id bigserial,
    Amount numeric(15,2),
    Date timestamp,
    Remarks varchar(30),
    Expense_type_id bigserial,
    primary key (Expense_id),
    foreign key (Mem_id) references Member,
    foreign key (Expense_type_id) references expense_type
    
);

INSERT INTO Individual_Expense(Mem_id,Amount,Date,Remarks,Expense_type_id) values (1,100,NOW(),'Food1',2);
INSERT INTO Individual_Expense(Mem_id,Amount,Date,Remarks,Expense_type_id) values (1,1000,NOW(),'Food2',2);
INSERT INTO Individual_Expense(Mem_id,Amount,Date,Remarks,Expense_type_id) values (1,200,NOW(),'Food3',2);
INSERT INTO Individual_Expense(Mem_id,Amount,Date,Remarks,Expense_type_id) values (1,300,NOW(),'Food4',2);
INSERT INTO Individual_Expense(Mem_id,Amount,Date,Remarks,Expense_type_id) values (1,150,NOW(),'Food5',2);