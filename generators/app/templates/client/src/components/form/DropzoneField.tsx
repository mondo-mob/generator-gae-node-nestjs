import {
  Avatar,
  FormHelperText,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import Attachment from '@material-ui/icons/Attachment';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import Dropzone, { DropFilesEventHandler } from 'react-dropzone';
import { FieldRenderProps } from 'react-final-form';
import { request } from '../../util/http';

const styles = () => ({
  dropzone: {
    width: '100%',
    textAlign: 'center' as 'center',
    margin: '20px 0',
    padding: 10,
    height: 'none',
    border: 'dashed 2px #ccc',
    borderRadius: 5,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  dropzoneActive: {
    border: 'solid 2px green',
  },
  uploadProgress: {
    margin: 10,
    textAlign: 'center' as 'center',
    fontSize: 14,
    color: '#666',
  },
  error: {
    marginTop: 8,
    color: 'red',
    fontSize: 'small',
  },
});

interface AttachmentInput {
  id: string;
  filename: string;
}

interface Props extends FieldRenderProps<any, any>, WithStyles<typeof styles> {
  infoText: string;
  multiple: boolean;
  accept: string;
  onUploadingChanged?: (uploading: boolean) => void;
}

interface State {
  uploads: number;
}

class DropzoneFieldInner extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      uploads: 0,
    };
  }

  public render() {
    const {
      infoText,
      meta,
      classes,
      multiple,
      accept,
      input: { value },
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        <Dropzone
          className={classes!.dropzone}
          activeClassName={classes!.dropzoneActive}
          {...rest}
          multiple={multiple}
          disabled={this.isUploading()}
          onDrop={(acceptedFiles, rejectedFiles, event) => this.onDrop(acceptedFiles, rejectedFiles, event)}
          accept={accept}
        >
          <p>{infoText}</p>
          {this.isUploading() && (
            <div className={classes!.uploadProgress}>
              <p>Uploading files...</p>
              <LinearProgress />
            </div>
          )}
        </Dropzone>
        <List dense>
          {value &&
            value.map((attachment: AttachmentInput) => (
              <ListItem key={attachment.id}>
                <ListItemAvatar>
                  <Avatar>
                    <Attachment />
                  </Avatar>
                </ListItemAvatar>
                <a href={`/api/attachments/${attachment.id}/download`} target="_blank" rel="noopener noreferrer">
                  <ListItemText primary={attachment.filename} />
                </a>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.removeAttachment(attachment.id)} aria-label="Delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        {meta.error && meta.touched && <FormHelperText error>{meta.error}</FormHelperText>}
      </React.Fragment>
    );
  }

  private onDrop: DropFilesEventHandler = (accepted: File[]) => {
    accepted.forEach(file => this.uploadProfile(file));
  };

  private removeAttachment = (id: string) => {
    const {
      input: { value, onChange },
    } = this.props;
    const attachments = value.filter((attachment: AttachmentInput) => attachment.id !== id);
    onChange(attachments);
  };

  private startUpload = () => {
    this.setState(previousState => ({
      uploads: previousState.uploads + 1,
    }));
    if (this.props.onUploadingChanged) {
      this.props.onUploadingChanged(true);
    }
  };

  private finishUpload = (success: boolean) => {
    this.setState(previousState => ({
      uploads: previousState.uploads - 1,
    }));
    if (!this.isUploading()) {
      if (this.props.onUploadingChanged) {
        this.props.onUploadingChanged(false);
      }
    }
  };

  private isUploading = () => {
    return this.state.uploads > 0;
  };

  private prepareUpload = async (file: any) => {
    const response = await request(
      '/api/attachments/upload',
      'POST',
      JSON.stringify({
        contentType: file.type,
      }),
      {
        'Content-Type': 'application/json',
      },
    );
    return await response.json();
  };

  private uploadProfile = async (file: any) => {
    const {
      input: { value, onChange },
    } = this.props;

    this.startUpload();
    const upload = await this.prepareUpload(file);

    const reader = new FileReader();

    reader.onabort = () => {
      this.finishUpload(false);
    };

    reader.onerror = () => {
      this.finishUpload(false);
    };

    reader.onload = async () => {
      await fetch(upload.url, {
        method: 'POST',
        mode: 'no-cors',
        body: file,
        headers: {
          'Content-Type': file.type,
          'Content-Length': file.size,
        },
      });

      onChange([...value, { id: upload.id, filename: file.name }]);
      this.finishUpload(true);
    };

    reader.readAsBinaryString(file);
  };
}

export const DropzoneField = withStyles(styles)(DropzoneFieldInner as any);
