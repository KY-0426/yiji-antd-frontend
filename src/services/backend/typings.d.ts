declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCardSetVO_ = {
    code?: number;
    data?: CardSetVO;
    message?: string;
  };

  type BaseResponseCardVO_ = {
    code?: number;
    data?: CardVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListUserCardSetVO_ = {
    code?: number;
    data?: UserCardSetVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageCard_ = {
    code?: number;
    data?: PageCard_;
    message?: string;
  };

  type BaseResponsePageCardSet_ = {
    code?: number;
    data?: PageCardSet_;
    message?: string;
  };

  type BaseResponsePageCardSetVO_ = {
    code?: number;
    data?: PageCardSetVO_;
    message?: string;
  };

  type BaseResponsePageCardVO_ = {
    code?: number;
    data?: PageCardVO_;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageReviewRecordLog_ = {
    code?: number;
    data?: PageReviewRecordLog_;
    message?: string;
  };

  type BaseResponsePageReviewRecordLogVO_ = {
    code?: number;
    data?: PageReviewRecordLogVO_;
    message?: string;
  };

  type BaseResponsePageStudyPlan_ = {
    code?: number;
    data?: PageStudyPlan_;
    message?: string;
  };

  type BaseResponsePageStudyPlanVO_ = {
    code?: number;
    data?: PageStudyPlanVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserCardSet_ = {
    code?: number;
    data?: PageUserCardSet_;
    message?: string;
  };

  type BaseResponsePageUserCardSetVO_ = {
    code?: number;
    data?: PageUserCardSetVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseReviewRecordLogVO_ = {
    code?: number;
    data?: ReviewRecordLogVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseStudyPlanVO_ = {
    code?: number;
    data?: StudyPlanVO;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserCardSetVO_ = {
    code?: number;
    data?: UserCardSetVO;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type Card = {
    backContent?: string;
    cardSetId?: number;
    correctCount?: number;
    createTime?: string;
    difficulty?: number;
    frontContent?: string;
    id?: number;
    isDelete?: number;
    nextReviewTime?: string;
    reviewCount?: number;
    tags?: string;
    type?: number;
    updateTime?: string;
    userId?: number;
  };

  type CardAddRequest = {
    backContent?: string;
    cardSetId?: number;
    difficulty?: number;
    frontContent?: string;
    tags?: string[];
    type?: number;
  };

  type CardEditRequest = {
    backContent?: string;
    correctCount?: number;
    difficulty?: number;
    frontContent?: string;
    id?: number;
    reviewCount?: number;
    tags?: string[];
    type?: number;
  };

  type CardQueryRequest = {
    backContent?: string;
    cardSetId?: number;
    current?: number;
    difficulty?: number;
    frontContent?: string;
    id?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    type?: number;
    userId?: number;
  };

  type CardSet = {
    cardCount?: number;
    coverImage?: string;
    createTime?: string;
    description?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    name?: string;
    studyCount?: number;
    tags?: string;
    thumbNum?: number;
    type?: number;
    updateTime?: string;
    userId?: number;
  };

  type CardSetAddRequest = {
    coverImage?: string;
    description?: string;
    name?: string;
    tags?: string[];
    type?: number;
  };

  type CardSetEditRequest = {
    coverImage?: string;
    description?: string;
    id?: number;
    name?: string;
    tags?: string[];
    type?: number;
  };

  type CardSetQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    type?: number;
    userId?: number;
  };

  type CardSetUpdateRequest = {
    coverImage?: string;
    description?: string;
    id?: number;
    name?: string;
    tags?: string[];
    type?: number;
  };

  type CardSetVO = {
    cardCount?: number;
    coverImage?: string;
    createTime?: string;
    description?: string;
    favourNum?: number;
    id?: number;
    name?: string;
    studyCount?: number;
    tagList?: string[];
    thumbNum?: number;
    type?: number;
    updateTime?: string;
    user?: UserVO;
  };

  type CardUpdateRequest = {
    backContent?: string;
    correctCount?: number;
    difficulty?: number;
    frontContent?: string;
    id?: number;
    reviewCount?: number;
    tags?: string[];
    type?: number;
  };

  type CardVO = {
    backContent?: string;
    cardSetId?: number;
    correctCount?: number;
    createTime?: string;
    difficulty?: number;
    frontContent?: string;
    id?: number;
    nextReviewTime?: string;
    reviewCount?: number;
    tagList?: string[];
    type?: number;
    updateTime?: string;
    user?: UserVO;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type countFavoriteUsersByCardSetIdUsingGETParams = {
    /** cardSetId */
    cardSetId: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getCardSetFavoriteStatisticsUsingGETParams = {
    /** cardSetId */
    cardSetId: number;
  };

  type getCardSetVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getCardVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getReviewRecordLogVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getStudyPlanVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserCardSetVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageCard_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Card[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCardSet_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CardSet[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCardSetVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CardSetVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCardVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CardVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageReviewRecordLog_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ReviewRecordLog[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageReviewRecordLogVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ReviewRecordLogVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageStudyPlan_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: StudyPlan[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageStudyPlanVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: StudyPlanVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserCardSet_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCardSet[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserCardSetVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserCardSetVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type ReviewRecordLog = {
    cardId?: number;
    cardSetId?: number;
    createTime?: string;
    id?: number;
    intervalDays?: number;
    isDelete?: number;
    memoryStrength?: number;
    nextIntervalDays?: number;
    nextReviewTime?: string;
    result?: string;
    reviewNote?: string;
    reviewResult?: number;
    reviewTime?: string;
    strength?: number;
    updateTime?: string;
    userId?: number;
  };

  type ReviewRecordLogAddRequest = {
    cardId?: number;
    result?: string;
    strength?: number;
  };

  type ReviewRecordLogEditRequest = {
    cardId?: number;
    cardSetId?: number;
    id?: number;
    intervalDays?: number;
    memoryStrength?: number;
    nextIntervalDays?: number;
    result?: string;
    reviewNote?: string;
    reviewResult?: number;
    reviewTime?: number;
    strength?: number;
  };

  type ReviewRecordLogQueryRequest = {
    cardId?: number;
    cardSetId?: number;
    current?: number;
    id?: number;
    intervalDays?: number;
    memoryStrength?: number;
    pageSize?: number;
    reviewResult?: number;
    reviewTime?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ReviewRecordLogUpdateRequest = {
    cardId?: number;
    cardSetId?: number;
    id?: number;
    intervalDays?: number;
    memoryStrength?: number;
    nextIntervalDays?: number;
    result?: string;
    reviewNote?: string;
    reviewResult?: number;
    reviewTime?: number;
    strength?: number;
  };

  type ReviewRecordLogVO = {
    card?: CardVO;
    cardSet?: CardSetVO;
    createTime?: string;
    id?: number;
    intervalDays?: number;
    memoryStrength?: number;
    nextIntervalDays?: number;
    reviewNote?: string;
    reviewResult?: number;
    reviewTime?: number;
    userId?: number;
  };

  type StudyPlan = {
    cardSetId?: number;
    consecutiveDays?: number;
    createTime?: string;
    currentProgress?: number;
    dailyTarget?: number;
    endTime?: string;
    id?: number;
    isCompleted?: number;
    isDelete?: number;
    planDescription?: string;
    planName?: string;
    progress?: number;
    startTime?: string;
    status?: number;
    studiedCardCount?: number;
    totalCardCount?: number;
    updateTime?: string;
    userId?: number;
  };

  type StudyPlanAddRequest = {
    cardSetId?: number;
    dailyTarget?: number;
    endTime?: string;
    planDescription?: string;
    planName?: string;
    startTime?: string;
  };

  type StudyPlanEditRequest = {
    consecutiveDays?: number;
    currentProgress?: number;
    dailyTarget?: number;
    endTime?: string;
    id?: number;
    isCompleted?: number;
    planDescription?: string;
    planName?: string;
    progress?: number;
    startTime?: string;
    status?: number;
    studiedCardCount?: number;
    totalCardCount?: number;
  };

  type StudyPlanQueryRequest = {
    cardSetId?: number;
    current?: number;
    dailyTarget?: number;
    endTime?: string;
    id?: number;
    pageSize?: number;
    planDescription?: string;
    planName?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    status?: number;
    userId?: number;
  };

  type StudyPlanUpdateRequest = {
    consecutiveDays?: number;
    currentProgress?: number;
    dailyTarget?: number;
    endTime?: string;
    id?: number;
    isCompleted?: number;
    planDescription?: string;
    planName?: string;
    progress?: number;
    startTime?: string;
    status?: number;
    studiedCardCount?: number;
    totalCardCount?: number;
  };

  type StudyPlanVO = {
    cardSet?: CardSetVO;
    consecutiveDays?: number;
    createTime?: string;
    dailyTarget?: number;
    endTime?: string;
    id?: number;
    planDescription?: string;
    planName?: string;
    progress?: number;
    startTime?: string;
    status?: number;
    studiedCardCount?: number;
    totalCardCount?: number;
    updateTime?: string;
    userId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserCardSet = {
    averageAccuracy?: number;
    cardSetId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    lastStudyTime?: string;
    progress?: number;
    relationType?: number;
    studiedCardCount?: number;
    studyDays?: number;
    totalCardCount?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserCardSetAddRequest = {
    cardSetId?: number;
    relationType?: number;
  };

  type UserCardSetEditRequest = {
    averageAccuracy?: number;
    cardSetId?: number;
    id?: number;
    progress?: number;
    relationType?: number;
    studiedCardCount?: number;
    studyDays?: number;
    totalCardCount?: number;
  };

  type UserCardSetQueryRequest = {
    averageAccuracy?: number;
    cardSetId?: number;
    current?: number;
    id?: number;
    lastStudyTime?: string;
    pageSize?: number;
    progress?: number;
    relationType?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    studyDays?: number;
    userId?: number;
  };

  type UserCardSetUpdateRequest = {
    averageAccuracy?: number;
    cardSetId?: number;
    id?: number;
    progress?: number;
    relationType?: number;
    studiedCardCount?: number;
    studyDays?: number;
    totalCardCount?: number;
  };

  type UserCardSetVO = {
    averageAccuracy?: number;
    cardSet?: CardSetVO;
    createTime?: string;
    id?: number;
    lastStudyTime?: string;
    progress?: number;
    relationType?: number;
    studiedCardCount?: number;
    studyDays?: number;
    totalCardCount?: number;
    updateTime?: string;
    userId?: number;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
