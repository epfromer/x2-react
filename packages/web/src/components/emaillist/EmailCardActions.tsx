import {
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  selectEmail,
} from '@klonzo/common'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

interface Props {
  id: string
}
export default function EmailCardActions({ id }: Props) {
  const history = useHistory()
  const totalEmails = useSelector(selectEmail)?.length
  const emailIndex = getEmailIndex(id)
  const previousEmailId = getPreviousEmailId(id)
  const nextEmailId = getNextEmailId(id)

  return (
    <CardActions>
      <Grid justify="space-between" container>
        <Grid item>
          <Tooltip title="Back to list">
            <IconButton
              aria-label="back to list"
              data-testid="back-to-list"
              onClick={() => history.push(`/SearchView`)}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          {totalEmails ? `${emailIndex} of ${totalEmails}` : ''}
          <Tooltip title="Previous email">
            <span>
              <IconButton
                aria-label="previous email"
                data-testid="previous-email"
                disabled={!previousEmailId}
                onClick={() =>
                  history.push(`/EmailDetailView/${previousEmailId}`)
                }
              >
                <ArrowLeftIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Next email">
            <span>
              <IconButton
                aria-label="next email"
                data-testid="next-email"
                disabled={!nextEmailId}
                onClick={() => history.push(`/EmailDetailView/${nextEmailId}`)}
              >
                <ArrowRightIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </CardActions>
  )
}
