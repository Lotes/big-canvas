var adjectives = new Array("Shitty","Bitchy","Freaky","Creepy","Racist","Ignorant","Stupid","Dumb","Meaningless","Unholy","Ridiculous","Fat","Stinky","Smelly","Shit-stained","Cum-guzzling","Shit-eating","Piss-drinking","Cum-stained","Jizz-guzzling","Jizz-stained","Hare-brained","Disgusting","Repulsive","Putrid","Crappy","Unlikeable","Villainous","Uncultured","Redneck","Scruffy","Dirty","Annoying","Unbearable","Stupid","Obese","Slimy","Greasy","Childlike","Nerdy","Friendless","Awkward","Gangly","Hated","Dirty","Filthy","Hopeless","Donkey-fucking","Dog-fucking","Mother-fucking","Inbred","Pimply","Shit-fucking","Worthless","Fucking","Bastardly","Unloved","Pathetic","Talentless","Crazy","Dick-licking","Ass-kissing","Ass-eating","Cranky","Old","Miserable","Decrepit","Little","Conceited","Uppity","Arrogant","Insane","Sad","Dog-faced","Ugly","Hideous");
var nouns = new Array("Shithead","Piece of shit","Shit-eater","Shit-fucker","Pile of shit","Heap of shit","Piss-drinker","Fucknut","Fuckface","Mother-fucker","Fuck","Dog-fucker","Cat-fucker","Rapist","Racist","Nazi","Bastard","Bitch","Dick","Dickhead","Nutsack","Dick-licker","Shit-licker","Lunatic","Baby","Cocksucker","Imbecile","Ignoramus","Dumbass","Asshole","Ass-face","Ass-kisser","Ass-licker","Asshole-licker","Failure","Bag of shit","Sack of shit","Jizz-rag","Slut","Pansy","Wimp","Pussy","Wuss","Trash","Piece of garbage","Scumbag","Cum-bucket","Trash-heap","Coward","Monster");

function randomElement(array) {
    return array[Math.floor(array.length * Math.random())];
}

var NameGenerator = {
    generate: function() {
        return randomElement(adjectives)+" "+randomElement(nouns);
    }
};

module.exports = NameGenerator;