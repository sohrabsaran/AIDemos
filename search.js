/*
Detailed Documentation:
https://sohrabsaran.github.io/AIDemos/aiNotes.html#h.4x8huwfrav6i
*/
function generateAndTest_algo(
P,
first, 
candidateSolutionType,
valid, 
use, 
next
)
{
	let encounteredCandidates = {}
	let nextCandidateTrackingInfo = []
	let c = first(candidateSolutionType)
	while(c != null)
	{
		if(valid(P, c, encounteredCandidates)) {
			use(P, c, nextCandidateTrackingInfo)
		}
		c = next(c, candidateSolutionType, nextCandidateTrackingInfo)
	}
}
