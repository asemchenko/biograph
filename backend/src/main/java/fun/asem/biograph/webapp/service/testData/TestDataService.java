package fun.asem.biograph.webapp.service.testData;

//@Slf4j
//@RequiredArgsConstructor
//@Service
public class TestDataService {
   /* private final EventService eventService;
    private final UserService userService;
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final AttributeService attributeService;
    private final AttributeMapper attributeMapper;
    private final TagService tagService;
    private final TagMapper tagMapper;

    public String generateTestFinances() {
        Instant startDate = Instant.ofEpochMilli(1514764800000L);
        Instant endDate = Instant.ofEpochMilli(1563580800000L);
        ArrayList<ParameterInfo> params = new ArrayList<>();
        // sleep
        params.add(new ParameterInfo(32, 7*60 + 30, 7*60 + 31, 60));
        // motivation
        params.add(new ParameterInfo(35, 6, 8, 1));
        // health
        params.add(new ParameterInfo(38, 9, 6, 1));
        // cardio
        params.add(new ParameterInfo(53, 2, 3, 2));
        int stepDays = 7;
        long categoryId = 45L;
        long userId = 4;

        StringBuilder result = new StringBuilder();

        // calc total events
        long totalEvents = ChronoUnit.DAYS.between(startDate, endDate) / stepDays;
        for (int i = 0; i < totalEvents; i++) {
            result.append(i).append(";");
            HashMap<Long, Long> paramValues = new HashMap<>();
            for (ParameterInfo param : params) {
                long k = getK(param.startValue, param.endValue, totalEvents);
                long curValue = i * k + param.startValue + noise(0, param.noiseDeviation);
                paramValues.put(param.attributeId, curValue);
                result.append(curValue).append(";");
            }
            result.append(System.lineSeparator());
            createEvent(startDate.plus(
                    i * stepDays, ChronoUnit.DAYS),
                    paramValues,
                    categoryId,
                    "Загальне #" + (i+1),
                    userId,
                    Arrays.asList(276L));
        }
        return result.toString();
    }

    private void createEvent(Instant date, Map<Long, Long> paramValueMap, Long categoryId, String eventName, Long userId, List<Long> tagIds) {
        User user = userService.findUserByUserId(userId).get();
        Category category = categoryService.findCategoryById(categoryId).get();

        CreateEventDto eventDto = new CreateEventDto();
        eventDto.setName(eventName);
        eventDto.setDescription("");
        eventDto.setStartDatetime(date);
        // adding tags
        ArrayList<UpdateTagDto> tags = new ArrayList<>(tagIds.size());
        for (Long tagId : tagIds) {
            tags.add(tagMapper.entityToUpdateDto(tagService.findTagById(tagId).get()));
        }
        eventDto.setTags(tags);
        eventDto.setCategory(categoryMapper.entityToUpdateDto(category));
        List<CreateParameterDto> params = new ArrayList<>();
        // getting attributes
        for (Map.Entry<Long, Long> entry : paramValueMap.entrySet()) {
            Long attributeId = entry.getKey();
            Attribute attribute = attributeService.findAttributeById(attributeId).get();
            CreateParameterDto dto = new CreateParameterDto();
            dto.setAttribute(attributeMapper.entityToUpdateDto(attribute));
            dto.setValue(entry.getValue().toString());
            params.add(dto);
        }
        eventDto.setParameters(params);
        ResponseEventDto responseEventDto = eventService.create(eventDto, user);
        log.info("Created event with id: " + responseEventDto.getEventId());
    }

    private long getK(long startValue, long endValue, long totalEvents) {
        return (endValue - startValue) / totalEvents;
    }

    private long noise(long start, long end) {
        return (long) (Math.random() * (end - start));
    }*/
}
/*
@AllArgsConstructor
@Data
class ParameterInfo {
    long attributeId;
    long startValue;
    long endValue;
    long noiseDeviation;
}
*/
