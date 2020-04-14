package fun.asem.biograph.webapp.dto;

import fun.asem.biograph.webapp.domain.StorageProviderType;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
public class AddStorageProviderRequest {
    @NotNull
    private StorageProviderType provider;
}
