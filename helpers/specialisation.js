import { talentTrees } from "../constant";

export const getSpecialisations = (
  className,
  characterTalentTree,
  orderBySpe = true
) => {
  const speRanking = [];

  characterTalentTree.forEach((value, index) => {
    const sortingValue = { index, value };

    if (orderBySpe) {
      if (index === 0) speRanking.push(sortingValue);
      else {
        if (value >= speRanking[0].value) speRanking.splice(0, 0, sortingValue);
        else {
          if (speRanking[1] && value >= speRanking[1].value)
            speRanking.splice(1, 0, sortingValue);
          else speRanking.push(sortingValue);
        }
      }
    } else {
      speRanking.push(sortingValue);
    }
  });

  return speRanking.map(spec => {
    return {
      name: Object.keys(talentTrees[className])[spec.index],
      value: spec.value
    };
  });
};
