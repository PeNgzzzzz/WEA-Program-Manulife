




const selectExcersize = (arr) => {
    return arr[(Math.floor(Math.random() * arr.length))]
}


const PushPullAlgorithm = (database, equip, muscleGroup, goal, warmupReps, compoundReps, isolationReps) => {


    //array represents the excersizes performed
    let excersizesForDay = [];
    let filteredExcersize;


    //gets warmup 

    const GetWarmUp = () => {

        if (muscleGroup != 'rest') {

            if (goal === 'buildMuscle' || goal === 'buildStrength') {
                filteredExcersize = database.filter(excersize => excersize.Warmup === muscleGroup && equip.includes(excersize.Equipment));
            }
            else if (goal === 'loseFat') {
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio' && equip.includes(excersize.Equipment));
            }
            else {
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo' && equip.includes(excersize.Equipment));
            }

            if (filteredExcersize) {
                let selectedWarmup = selectExcersize(filteredExcersize);

                selectedWarmup = { 'name': selectedWarmup.Exercise, 'muscle': selectedWarmup.MajorMuscle, 'reps': warmupReps, 'image': 'IMAGEURL' }
                excersizesForDay.push(selectedWarmup);
            }
        }
    }

    const getCompound = () => {
        //filters to get excerszies of workout day depending on muscleGroup. For example all excersizes considered a 'push' excersize

        if (muscleGroup != 'rest') {
            if (goal === 'buildMuscle' || goal === 'buildStrength') {



                let target;
                let numOfCompounds = 3;
                
                if (equip.indexOf('Dumbbells') !== -1) { equip = equip.filter(equip => equip !== 'Body Weight') }


                if (muscleGroup === 'pull') {
                    target = 'Back';
                }
                if (muscleGroup === 'push') {
                    target = 'Chest';
                }
                if (muscleGroup === 'legs') {
                    target = 'Legs';
                }


                if (muscleGroup === 'push') {
           
                    filteredExcersize = database.filter(excersize => ((excersize.MajorMuscle === target || excersize.MajorMuscle === 'Shoulders') && excersize.Compound === 'yes' && excersize.Warmup === 'no' && equip.indexOf(excersize.Equipment) >= 0))
                }
                else {
                    filteredExcersize = database.filter(excersize => (excersize.MajorMuscle === target && excersize.MinorMuscle !== 'Calves' && excersize.Compound === 'yes' && excersize.Warmup === 'no' && equip.indexOf(excersize.Equipment) >= 0))
                }

          

                if (filteredExcersize) {
                    //gets two compound excersizes
                    while (excersizesForDay.length <= numOfCompounds) {

                        let selectedCompound = selectExcersize(filteredExcersize)
                        selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MinorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedCompound.name) !== -1 || excersizesForDay.findIndex(activity => activity.muscle === selectedCompound.muscle) !== -1) {

                            selectedCompound = selectExcersize(filteredExcersize)
                            selectedCompound = { 'name': selectedCompound.Exercise, 'muscle': selectedCompound.MinorMuscle, 'reps': compoundReps, 'image': 'IMAGEURL' }
                            console.log('re run compound')
                        }
                        excersizesForDay.push(selectedCompound)

                    }
                }
            }

            else if (goal === 'loseFat') {

                let numOfCompounds = 3;

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

            else {

                let numOfCompounds = 3;
                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo' && equip.includes(excersize.Equipment));
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
                let target;
                let compound = 'no'

                if (muscleGroup === 'pull') {
                    target = 'Bicep';
                }
                if (muscleGroup === 'push') {
                    target = 'Tricep';
                }
                if (muscleGroup === 'legs') {
                    target = 'Calves';
                    compound = 'yes'
                }

                filteredExcersize = database.filter(excersize => (excersize.MinorMuscle === target && excersize.Compound === compound && equip.includes(excersize.Equipment)))



                if (filteredExcersize) {
                    //gets two isolation excersizes
                    while (excersizesForDay.length < 6) {
                        let selectedIsolation = selectExcersize(filteredExcersize)
                        selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MinorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }

                        //gets new selected excersizes until they arent alrerady in routine to remove duplicated
                        while (excersizesForDay.findIndex(activity => activity.name === selectedIsolation.name) !== -1) {
                            selectedIsolation = selectExcersize(filteredExcersize)
                            selectedIsolation = { 'name': selectedIsolation.Exercise, 'muscle': selectedIsolation.MinorMuscle, 'reps': isolationReps, 'image': 'IMAGEURL' }
                            console.log('iso rerun')
                        }
                        excersizesForDay.push(selectedIsolation)
                    }
                }
            }

            else if (goal === 'loseFat') {


                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Cardio' && equip.includes(excersize.Equipment));

                if (filteredExcersize) {
                    //gets two compound excersizes
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

            else {


                filteredExcersize = database.filter(excersize => excersize.ExerciseType === 'Yoga' || excersize.ExerciseType === 'Plyo' && equip.includes(excersize.Equipment));
                if (filteredExcersize) {
                    //gets two compound excersizes
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


export default PushPullAlgorithm