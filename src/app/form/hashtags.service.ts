export class HashtagsService {
  getCommonHashtags(hashtags: string[]): string[] {
    const tagGroups = hashtags.map(group => group.trim());
    const tagGroupsCount = tagGroups.length;

    const removeDuplicates = arr => {
      return arr.filter((tag, idx, array) => {
        return array.indexOf(tag) === idx;
      });
    };

    const allEnteredHashtags = tagGroups.reduce((tags, group) => {
      const groupArr = group.split(/[\s\r\n,]+/);
      const cleanedGroup = removeDuplicates(groupArr);
      return [...tags, ...cleanedGroup];
    }, []);

    const hashTagCounts = allEnteredHashtags.reduce((counts, tag) => {
      counts[tag] = counts[tag] + 1 || 1;
      return counts;
    }, {});

    const commonTags = Object.keys(hashTagCounts).filter(tag => {
      if (hashTagCounts[tag] === tagGroupsCount) return tag;
    });

    return commonTags.length ? commonTags : ["No Common Hashtags found."];
  }
}
