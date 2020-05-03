/*
Detailed Documentation:
https://sohrabsaran.github.io/AIDemos/aiNotes.html#h.4x8huwfrav6i
*/
function generateAndTest(
P,
newSearch,
first,
valid, 
use, 
next
)
{
	let s = newSearch()
	s.p = P
	let c = first()
	while(c != null)
	{
		if(valid(c, s)) {
			use(c, s)
		}
		c = next(s, c)
	}
}
