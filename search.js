/*
Detailed Documentation:
https://sohrabsaran.github.io/AIDemos/aiNotes.html#h.4x8huwfrav6i
*/
function generateAndTest(P, newSearch, first, valid, use, next) {
	let s = newSearch()
	s.p = P
	let c = first()
	while(c != null) {
		if(valid(c, s)) {use(c, s)}
		c = next(s, c)
	}
}

function newNonBruteForceSearch() {
	let s = {}
	s.encounteredCandidates = {}
	s.generators = []
	s.bestCandidates = []
	s.bestError = Infinity
	return s
}

function nonBruteForceSearchValid(c, s) {
	let k = c.getStringForUniquenessChecking()
	let v = s.encounteredCandidates[k]
	if(v != null && v != c.getId()){return false}
	if(v == null) {s.encounteredCandidates[k] = c.getId()}
	return true
 }

function nonBruteForceSearchUse(c, s) {
	let error
	Let prevBestError = s.bestError 
	try {error = c.testSelfAgainst(s.p)}catch{error = Infinity}
	if(error <= s.bestError){
		s.updateBestCandidates(c, error)
		s.bestError = error
	}
	s.updateGenerators(c, error, prevBestError)
}

