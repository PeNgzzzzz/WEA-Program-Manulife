const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const FullbodyAlgorithm = (database, equip, muscleGroup, goal, warmupReps, compoundReps, isolationReps) => {


    //array represents the excersizes performed
    let excersizesForDay = []
    let filteredExcersize



    //gets warmup

    const GetWarmUp = () => {

        if (muscleGroup != 'rest') {

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                filteredExcersize = database.filter(excersize => excersize.Warmup === muscleGroup && equip.includes(excersize.Equipment));
            }
            else if (goal === 'loseFat') {
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === "Cardio" && equip.includes(excersize.Equipment));
            }
            else{
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo' && equip.includes(excersize.Equipment));
            }


            if (filteredExcersize) {
                console.log(filteredExcersize)
                let selectedWarmup = selectExcersize(filteredExcersize);
                //console.log(selectedWarmup)
                selectedWarmup = { 'name': selectedWarmup.Exercise, 'muscle': 'warmup', 'reps': warmupReps, 'image': 'IMAGEURL' }
                excersizesForDay.push(selectedWarmup);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        let numOfCompounds;

        if (muscleGroup != 'rest') {



            if (goal === 'buildMuscle' || goal === 'buildStrength') {

                
                if (equip.indexOf('Dumbbells') !== -1) {equip = equip.filter(equip => equip !== 'Body Weight')}

                numOfCompounds = 3

                filteredExcersize = database.filter(excersize => ((excersize.MajorMuscle === 'Full Body' || excersize.MajorMuscle === 'Chest'
                    || excersize.MajorMuscle.indexOf('Back') !== -1 || excersize.MajorMuscle == 'Legs'
                    || excersize.MajorMuscle === 'Shoulders') && excersize.Compound === 'yes' && excersize.Warmup === 'no' && equip.includes(excersize.Equipment)))

                console.log(filteredExcersize)

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {
                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        }

                        excersizesForDay.push(selectedCompound);

                    }
                }
            }

            else if (goal === 'loseFat') {

                numOfCompounds = 4;

                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio' && excersize.Compound === 'yes' && equip.includes(excersize.Equipment));

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1) {
                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        }

                        excersizesForDay.push(selectedCompound);

                    }
                }
            }
            else{

                numOfCompounds = 5;

                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo' && equip.includes(excersize.Equipment));
                console.log(filteredExcersize)
                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1) {
                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MajorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        }

                        excersizesForDay.push(selectedCompound);

                    }
                }

            }
        }
    }

    const getIsolation = () => {



        if (muscleGroup != 'rest') {


            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                filteredExcersize = database.filter(excersize => ((excersize.MinorMuscle === 'Bicep' || excersize.MinorMuscle === 'Tricep'
                    || excersize.MajorMuscle === 'Core') && excersize.Compound === 'no' && excersize.Warmup === 'no' && equip.includes(excersize.Equipment)))



                if (filteredExcersize) {
                    //gets two isolation excersizes
                    while (excersizesForDay.length < 6) {
                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedIsolation.muscle) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                        }
                        excersizesForDay.push(selectedIsolation);
                    }
                }
            }
            else if (goal === 'loseFat') {

                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio' && equip.includes(excersize.Equipment));

                if (filteredExcersize) {
                    //gets two isolation excersizes
                    while (excersizesForDay.length < 6) {
                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                        }
                        excersizesForDay.push(selectedIsolation);
                    }
                }
            }

            else{
                filteredExcersize = database.filter(excersize => (excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo' && equip.includes(excersize.Equipment)));

                if (filteredExcersize) {
                    //gets two isolation excersizes
                    while (excersizesForDay.length < 6) {
                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MajorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                        }
                        excersizesForDay.push(selectedIsolation);
                    }
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