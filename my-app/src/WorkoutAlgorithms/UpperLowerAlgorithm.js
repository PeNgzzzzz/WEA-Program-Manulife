




const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const UpperLowerAlgorithm = (database, muscleGroup) => {


    //array represents the excersizes performed
    let excersizesForDay = []
    let filteredExcersize

    //gets warmup 

    const GetWarmUp = () => {

        let numWarmups;

        if (muscleGroup != 'rest') {
            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => excersize.fields.Warmup === 'push' || excersize.fields.Warmup === 'pull');
                numWarmups = 2
            }
            else {
                filteredExcersize = database.filter(excersize => excersize.fields.Warmup === 'legs');
                numWarmups = 1
            }
            if (filteredExcersize) {


                while (excersizesForDay.length < numWarmups) {

                    let selectedWarmup = selectExcersize(filteredExcersize);
                    selectedWarmup = { 'name': selectedWarmup.fields.Exercise, 'muscle': selectedWarmup.fields.MajorMuscle[0] }

                    while (excersizesForDay.findIndex(activity => activity.name === selectedWarmup.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedWarmup.muscle) !== -1) {
                        let selectedWarmup = selectExcersize(filteredExcersize);
                        selectedWarmup = { 'name': selectedWarmup.fields.Exercise, 'muscle': selectedWarmup.fields.MajorMuscle[0] }
                    }
                    excersizesForDay.push(selectedWarmup);
                }


            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {

            let target;
            let numOfCompounds;


            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf('Chest') !== -1 || excersize.fields.MajorMuscle.indexOf('Shoulders') !== -1
                    || excersize.fields.MajorMuscle.indexOf('Back') !== -1 && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))
                numOfCompounds = 3
            }
            if (muscleGroup === 'lower') {
                filteredExcersize = database.filter(excersize => (excersize.fields.MinorMuscle.indexOf('Quads') !== -1 || excersize.fields.MinorMuscle.indexOf('Glutes') !== -1
                    || excersize.fields.MinorMuscle.indexOf('Calves') || excersize.fields.MinorMuscle.indexOf('Hamstrings') && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))
                numOfCompounds = 4
            }

            if (filteredExcersize) {
                //gets two compound excersizes
                while (excersizesForDay.length <= numOfCompounds) {

                    let selectedCompound = selectExcersize(filteredExcersize)
                    if (muscleGroup === 'lower') {
                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0] }
                    }
                    else {
                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0] }
                    }
                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {
                        selectedCompound = selectExcersize(filteredExcersize)
                        console.log('rerun')
                        if (muscleGroup === 'lower') {
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0] }
                        }
                        else {
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0] }
                        }


                    }
                    excersizesForDay.push(selectedCompound)

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
    //getIsolation()
    return (excersizesForDay)
}


export default UpperLowerAlgorithm