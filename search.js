/*
START Please preserve this notice
Copyright sohrabsaran@gmail.com, 2020. MIT License.
License file location: https://github.com/sohrabsaran/AIDemos/blob/master/LICENSE
Location of this file in its repository: https://github.com/sohrabsaran/AIDemos/blob/master/search.js
deployed at: NA
END Please preserve this notice

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

function doNonBruteForceSearch(P, first, valid, use, next) {
	let newSearch = newNonBruteForceSearch
	valid = valid ? valid : nonBruteForceSearchValid
	use = use ? use : nonBruteForceSearchUse
	next = next ? next : nonBruteForceSearchNext
	generateAndTest(P, newSearch, first, valid, use, next)
} 


function newNonBruteForceSearch() {
	let s = {}
	s.encounteredCandidates = {}
	s.generators = []
	s.bestCandidates = []
	s.partlyTestedCandidates = []
	s.bestError = Infinity
	return s
}

function nonBruteForceSearchValid(c, s) {
	let k = getStringForUniquenessChecking(c)
	let v = s.encounteredCandidates[k]
	if(v != null && v != getId(c)){return false}
	if(v == null) {s.encounteredCandidates[k] = getId(c)}
	return true
 }

function nonBruteForceSearchUse(c, s) {
	s.prevBestError = s.bestError 
	try {c.error += test(c, s.p)}catch(e){c.error = Infinity}
	if(c.error <= s.bestError && c.isFullyTested){
		updateBestCandidates(s.bestCandidates, c)
		s.bestError = c.error
	}
	s.updateGenerators(c)
}

let candidateCtr = 0

function nonBruteForceSearchNext(s, c) {
	let generator = bestGenerator(s.generators)
	c = nextCandidateFromGenerator(generator)
	c.id = candidateCtr
	candidateCtr++
	c.error = 0
	return nextCandidate(c, s.partlyTestedCandidates)
}
