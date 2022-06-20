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

            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => excersize.fields.Warmup === 'push' || excersize.fields.Warmup === 'pull');
            }
            else {
                filteredExcersize = database.filter(excersize => excersize.fields.Warmup === 'legs');

            }

            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);
                selectedWarmup = { 'name': selectedWarmup.fields.Exercise, 'muscle': selectedWarmup.fields.MajorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }
                excersizesForDay.push(selectedWarmup);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {

            let numOfCompounds;


            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => ((excersize.fields.MajorMuscle.indexOf('Back') !== -1 || excersize.fields.MajorMuscle.indexOf('Chest') !== -1
                    || excersize.fields.MajorMuscle.indexOf('Shoulders') !== -1) && excersize.fields.Compound === 'yes' && excersize.fields.Warmup === 'no'))

                numOfCompounds = 3
            }
            else {
                //HAVE TO ADD COMPPUND AS FILTER
                filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf('Legs') !== -1 && excersize.fields.Warmup === 'no'))

                numOfCompounds = 4
            }

            if (filteredExcersize) {
                //gets two compound excersizes
                while (excersizesForDay.length <= numOfCompounds) {

                    let selectedCompound = selectExcersize(filteredExcersize)

                    if(muscleGroup === 'upper'){
                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }
                    }
                    else{
                        selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }
                    }
                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 && excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {

                        selectedCompound = selectExcersize(filteredExcersize)
                        if(muscleGroup === 'upper'){
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MajorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }
                        }
                        else{
                            selectedCompound = { 'name': selectedCompound.fields.Exercise, 'muscle': selectedCompound.fields.MinorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }
                        }
                    }
                    excersizesForDay.push(selectedCompound)

                }
            }
        }
    }

    const getIsolation = () => {



        if (muscleGroup != 'rest') {

            let target;
            if (muscleGroup === 'upper') {
                filteredExcersize = database.filter(excersize => ((excersize.fields.MinorMuscle.indexOf('Bicep') !== -1 || excersize.fields.MinorMuscle.indexOf('Tricep') !== -1) && excersize.fields.Compound === 'no' && excersize.fields.Warmup === 'no'))
            }
            else {
                filteredExcersize = database.filter(excersize => (excersize.fields.MajorMuscle.indexOf('Legs') !== -1 && excersize.fields.Compound === 'no' && excersize.fields.Warmup === 'no'))
            }




            if (filteredExcersize) {
                //gets two isolation excersizes
                while (excersizesForDay.length < 6) {
                    let selectedIsolation = selectExcersize(filteredExcersize)
                    selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MinorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }

                    //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                    while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedIsolation.muscle) !== -1) {
                        selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.fields.Exercise, 'muscle': selectedIsolation.fields.MinorMuscle[0], 'reps': '3x6', 'image': 'IMAGEURL' }
                    }
                    excersizesForDay.push(selectedIsolation)
                }
            }
        }

    }

    GetWarmUp()
    getCompound()
    getIsolation()
    return (excersizesForDay)
}


export default PushPullAlgorithm