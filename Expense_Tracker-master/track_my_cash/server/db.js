import pg from "pg";

var conString =
	"postgres://izchcpbe:1t20hJ5IFdm_kmkJ1KAc3sf0oOBcDZLp@satao.db.elephantsql.com/izchcpbe";
var client = new pg.Client(conString);
client.connect(function (err) {
	if (err) {
		return console.error("could not connect to postgres", err);
	}
});

export default client;
