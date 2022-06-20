const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const FullbodyAlgorithm = (database, muscleGroup) => {


    //array represents the excersizes performed
    let excersizesForDay = []
    let filteredExcersize

    //gets warmup

    const GetWarmUp = () => {

        if (muscleGroup != 'rest') {
            filteredExcersize = database.filter(excersize => excersize.Warmup === muscleGroup);
            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);
                selectedWarmup = { 'name': selectedWarmup.Exercise, 'muscle': 'warmup' }
                excersizesForDay.push(selectedWarmup);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {

            let numOfCompounds = 3;


            filteredExcersize = database.filter(excersize => ((excersize.MajorMuscle.indexOf('Full Body') !== -1 || excersize.MajorMuscle.indexOf('Chest') !== -1
                                || excersize.MajorMuscle.indexOf('Back') !== -1 || excersize.MajorMuscle.indexOf('Legs') !== -1 
                                || excersize.MajorMuscle.indexOf('Shoulders') !== -1) && excersize.Compound === 'yes' && excersize.Warmup === 'no'))

            if (filteredExcersize) {
                //gets two compound excersizes
                while (excersizesForDay.length <= numOfCompounds) {

                    let selectedCompound = selectExcersize(filteredExcersize)
                    selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle[0] }

                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {
                        selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle[0] }

                    }

                    excersizesForDay.push(selectedCompound);

                }
            }
        }
    }

    const getIsolation = () => {



        if (muscleGroup != 'rest') {



            filteredExcersize = database.filter(excersize => ((excersize.MinorMuscle.indexOf('Bicep') !== -1 || excersize.MinorMuscle.indexOf('Tricep') !== -1) 
                                || excersize.MajorMuscle.indexOf('Core') !== -1) && excersize.Compound === 'no' && excersize.Warmup === 'no')



            if (filteredExcersize) {
                //gets two isolation excersizes
                while (excersizesForDay.length < 6) {
                    let selectedIsolation = selectExcersize(filteredExcersize)
                    selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle[0] }
                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedIsolation.muscle) !== -1) {
                        selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle[0] }
                    }
                    excersizesForDay.push(selectedIsolation);
                }
            }
        }

    }

    GetWarmUp()
    getCompound()
    getIsolation()
    return (excersizesForDay)
}


export default FullbodyAlgorithm