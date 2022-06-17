




const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const PushPullAlgorithm = (database, muscleGroup) => {


    //array represents the excersizes performed
    let excersizesForDay = []
    let filteredExcersize

    //gets warmup 

    const GetWarmUp = () => {

        if (muscleGroup != 'rest') {
            filteredExcersize = database.filter(excersize => excersize.fields.Warmup === muscleGroup);
            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);
                excersizesForDay.push(selectedWarmup.fields.Exercise);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {

            let target;
            let numOfCompounds = 2;


            if (muscleGroup === 'pull') {
                target = 'Back';
            }
            if (muscleGroup === 'push') {
                target = 'Chest';
            }
            if (muscleGroup === 'legs') {
                target = 'Legs';
            }
            

            if(muscleGroup === 'push'){
                filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf(target) !== -1 || excersize.fields.MajorMuscle.indexOf('Shoulders') !== -1 && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))
                numOfCompounds = 3
            }
            else{
                filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf(target) !== -1 && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))
            }

            if (filteredExcersize) {
                //gets two compound excersizes
                while (excersizesForDay.length <= numOfCompounds) {

                    let selectedCompound = selectExcersize(filteredExcersize)

                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.indexOf(selectedCompound.fields.Exercise) !== -1 && excersizesForDay.indexOf(selectedCompound.fields.MinorMuscle !== 'Middle Chest') 
                            && (excersizesForDay.indexOf(selectedCompound.fields.MinorMuscle !== 'Lower Chest')  || excersizesForDay.indexOf(selectedCompound.fields.MinorMuscle !== 'Upper Chest')) && excersizesForDay.indexOf(selectedCompound.fields.MinorMuscle !== 'Shoulders')) {

                        selectedCompound = selectExcersize(filteredExcersize)

                    }
                    excersizesForDay.push(selectedCompound.fields.Exercise)

                }
            }
        }
    }

    const getIsolation = () => {

        let numOfiso = 2;

        if (muscleGroup != 'rest') {

            let target;
            if (muscleGroup === 'pull') {
                target = 'Bicep';
            }
            if (muscleGroup === 'push') {
                target = 'Tricep';
            }
            if (muscleGroup === 'legs') {
                target = 'Glutes';
            }

            filteredExcersize = database.filter(excersize => (excersize.fields.MinorMuscle.indexOf(target) !== -1 && excersize.fields.Compound === 'no' && excersize.fields.Warmup === 'no'))



            if (filteredExcersize) {
                //gets two isolation excersizes
                while (excersizesForDay.length < 5) {
                    let selectedIsolation = selectExcersize(filteredExcersize)
                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.indexOf(selectedIsolation.fields.Exercise) !== -1) {
                        selectedIsolation = selectExcersize(filteredExcersize)
                    }
                    excersizesForDay.push(selectedIsolation.fields.Exercise)
                }
            }
        }

    }

    GetWarmUp()
    getCompound()
    getIsolation()
    return(excersizesForDay)
}


export default PushPullAlgorithm