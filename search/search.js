/*
START Please preserve this notice
Copyright sohrabsaran@gmail.com, 2020. MIT License.
License file location: https://github.com/sohrabsaran/AIDemos/blob/master/LICENSE
Location of this file in its repository: https://github.com/sohrabsaran/AIDemos/blob/master/search/search.js
deployed at: NA
END Please preserve this notice

Detailed Documentation:
https://sohrabsaran.github.io/AIDemos/aiNotes.html#h.4x8huwfrav6i
*/
let searchState
let problem
let candidate
let newSearchState
let validCandidate
let useCandidate
let selectNextCandidate
let getUniqueStringFromCandidate
let removeFullyTestedCandidateFromListOfPartlyTested
let addGeneratedCandidateToListOfPartlyTested
let testCandidate
let updateBestCandidates
let updateGenerators
let selectBestGenerator
let bestGenerator
let candidateCtr = 0
let generatedCandidate
let generateNextCandidate
let generateNextCandidateFromBestGenerator
let selectBestCandidateOutOfGeneratedOneAndPartlyTestedOnes

function generateAndTest() {
	searchState = newSearchState()
	candidate = firstCandidate()
	while(candidate != null) {
		if(validCandidate()) {useCandidate()}
		 selectNextCandidate()
	}
}

function doNonBruteForceSearch() {
	newSearchState = newNonBruteForceSearch
	validCandidate = validCandidate ?? nonBruteForceValidCandidate
	useCandidate = useCandidate ?? nonBruteForceUseCandidate
	selectNextCandidate = selectNextCandidate ?? nonBruteForceSelectNextCandidate
	generateAndTest()
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

function nonBruteForceValidCandidate() {
	let k = getUniqueStringFromCandidate()
	let v = s.encounteredCandidates[k]
	if(v != null && v != c.id){return false}
	if(v == null) {s.encounteredCandidates[k] = c.id}
	return true
 }

function nonBruteForceUseCandidate() {
	let s = searchState
	let c = candidate
	s.prevBestError = s.bestError
	try {c.error += testCandidate()}catch(e){
		c.error = Infinity
		c.isFullyTested = true	
	}
	if(c.isFullyTested) {
		removeFullyTestedCandidateFromListOfPartlyTested()
		if(c.error <= s.bestError){
			updateBestCandidates()
			s.bestError = c.error
		}
	}
	updateGenerators()
}

function nonBruteForceSelectNextCandidate() {
	generateNextCandidate()
	let c = generatedCandidate
	c.id = candidateCtr
	candidateCtr++
	c.error = 0
	addGeneratedCandidateToListOfPartlyTested()
	selectBestCandidateOutOfGeneratedOneAndPartlyTestedOnes()
}
	
function generateNextCandidate() {
	selectBestGenerator()
	generateNextCandidateFromBestGenerator()
}
